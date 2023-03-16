from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app=app, resources={r'/*': {'origins': '*'}})


def conf(key):
    try:
        with open("proxy_config.json") as f:
            li_conf = json.load(f)
        return li_conf.get(key)
    except:
        pass


@app.route('/alias', methods=['POST'])
def create_alias():
    data = request.json
    if not data.get('address') or not data.get('goto'):
        return jsonify({'error': 'Alias/goto is required'}), 400
    payload = {
        'active': '1',
        'address': data.get('address'),
        'goto': data.get('goto'),
    }
    headers = {
        'Content-Type': 'application/json',
        'x-api-key': conf("api_key"),
    }
    try:
        response = requests.post(
            conf("endpoint"), json=payload, headers=headers, verify=False)
        response.raise_for_status()
    except requests.exceptions.HTTPError as err:
        return jsonify({'error': f'Request failed: {err}'}), 500
    return jsonify(response.json()), 200


if __name__ == '__main__':
    app.run(port=2444)
