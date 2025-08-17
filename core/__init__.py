from flask import Flask
import os
app = Flask(__name__)
app.secret_key = os.environ.get('SESSION_SECRET')
from core import routes  # noqa
