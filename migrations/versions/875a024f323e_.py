"""empty message

Revision ID: 875a024f323e
Revises: c18286793746
Create Date: 2024-10-22 02:21:50.911730

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '875a024f323e'
down_revision = 'c18286793746'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('token_blocked_list',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('jti', sa.String(length=50), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('jti')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('token_blocked_list')
    # ### end Alembic commands ###
