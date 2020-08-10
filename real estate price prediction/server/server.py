from flask import Flask,jsonify,request,render_template
from helper import get_helper_locations,get_predicted_price
app = Flask(__name__)

@app.route('/')
def home():
    return "<h1>Online Real Estate Price Prediction</h1>"

@app.route('/load_locations')
def get_locations():
    response = jsonify({
        'locations':get_helper_locations()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response
@app.route('/predict_price',methods=['post'])
def predict_price():
    location=request.form['location']
    size = request.form['size']
    total_sqft= request.form['total_sqft']
    bath=request.form['bath']
    estimated_price = get_predicted_price(location,size,total_sqft,bath)
    response = jsonify({
        'estimated_price':estimated_price,
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

if __name__ == '__main__':
    print('This is the starting point of the website!')
    app.run()