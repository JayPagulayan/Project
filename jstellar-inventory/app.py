from flask import Flask, render_template, request, jsonify
import psycopg2
from psycopg2.extras import RealDictCursor


#Just trying to comment here
app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host='localhost',
        database='postgres',
        user='postgres',
        password='J12345678',
        port=5432
    )
    return conn

@app.route('/')
def home(): 
    conn = get_db_connection()

    cursor = conn.cursor(cursor_factory=RealDictCursor)

    cursor.execute('SELECT * FROM inventory ORDER BY id ASC;')
    items_from_db=cursor.fetchall()

    cursor.close()
    conn.close()

    return render_template('index.html', items=items_from_db)

@app.route('/add', methods=['POST'])
def add_item():
    new_item = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('INSERT INTO inventory (name, category, stock) VALUES (%s, %s, %s);',
        (new_item['name'], new_item['category'], new_item['stock'])
        )

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Success"})

@app.route('/delete/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute('DELETE FROM inventory WHERE id = %s;', (item_id,))
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Item Deleted"})

@app.route('/edit/<int:item_id>', methods=['POST'])
def edit_item(item_id):
    update_data = request.get_json()
    new_stock = update_data['stock']

    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('UPDATE inventory SET stock = %s WHERE id = %s;', (new_stock, item_id))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({"message": "Item Update"})

if __name__ == '__main__':
    app.run(debug=True)