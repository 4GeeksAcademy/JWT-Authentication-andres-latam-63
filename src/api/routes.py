"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup',methods=['POST'])
def signup():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg':'You must include information in the body'})
    if 'username' not in body:
        return jsonify({'msg': 'You must include a username'}),400
    if 'email' not in body:
        return jsonify({'msg':'Email is required'}),400
    if 'password' not in body:
        return jsonify({'msg':'Password is required'}),400
    valid_email = User.query.filter_by(email=body['email']).first()
    valid_username = User.query.filter_by(username=body['username']).first()
    if valid_email != None:
        return jsonify({'msg':'Email already exists'}),400
    if valid_username != None:
        return jsonify({'msg': 'Username already exists'}),400
    new_user = User()
    new_user.username = body['username']
    new_user.email = body['email']
    new_user.password = body['password']
    new_user.is_active = True
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg':'New user added successfully'}),200
