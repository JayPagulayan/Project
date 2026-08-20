from flask import Flask, render_template, request, jsonify

#Just trying to comment here
app = Flask(__name__)

inventory_list = [
    {"id": 101,"name":"Lenovo 1000", "category":"Computers","stock": 15 }
]

@app.route('/')
def home(): 
    return render_template('index.html', items=inventory_list)

@app.route('/add', methods=['POST'])
def add_item():
    new_item = request.get_json()

    inventory_list.append(new_item)

    return jsonify({"message": "Success"})

if __name__ == '__main__':
    app.run(debug=True)