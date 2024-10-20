"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)
app = Flask(__name__)
bcrypt = Bcrypt(app)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup_user():
    body = request.get_json()
    if body['email'] is None:
        return jsonify({"msg":"Por favor ingrese su usuario"}),400
    if body['password'] is None:
        return jsonify({"msg":"Por favor ingrese su contraseña"}), 400
    body['password']=bcrypt.generate_password_hash(body['password']).decode('utf-8')
    # se guarda en la bbdd
    user=User(email=body['email'], password=body['password'], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg":"Usuario creado con éxito", "user": user.serialize()})

@api.route("/login", methods=["POST"])
def user_login():
    # Se reciben los datos
    body = request.get_json()
    # Se validan los campos para crear el usuario
    if body["email"] is None:
        return jsonify({"msg": "Debe especificar un email"}), 400
    if body["password"] is None:
        return jsonify({"msg": "Debe especificar una contraseña"}), 400
    # Se busca el usuario en la base de datos y se verifica que exista
    user = User.query.filter_by(email=body["email"]).first()
    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 401
    valid_password = bcrypt.check_password_hash(user.password, body["password"])
    if not valid_password:
        return jsonify({"msg": "Clave inválida"}), 401
    # Se crea y se retorna el token de la sesión
    token = create_access_token(identity=user.id, additional_claims={"role": "admin"})
    return jsonify({"token": token})

@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify(user.serialize()), 200