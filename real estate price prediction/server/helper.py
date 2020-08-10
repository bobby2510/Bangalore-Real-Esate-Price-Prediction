import json
import numpy as np
import pickle

__locations=None
__data_columns=None
__model = None

def get_helper_locations():
    print('loading locations start...')
    global __locations
    global __data_columns
    with open('./artifacts/columns_data.json') as f:
        __data_columns=json.load(f).get('columns')
        __locations = __data_columns[3:]
    print('loading locations done...')
    return __locations

def get_predicted_price(location,size,total_sqft,bath):
    print('predicting price start...')
    global __model
    with open('./artifacts/real_estate_model.pickle','rb') as f:
        __model=pickle.load(f)
    try:
        req_index = __data_columns.index(location.lower())
        x = np.zeros(len(__data_columns))
        x[0]=int(size)
        x[1]=float(total_sqft)
        x[2]=int(bath)
    except:
        req_index=-1
    if req_index >=0 :
        x[req_index] = 1
    print('predicting price done...')
    return round(__model.predict([x])[0],2)

if __name__ == '__main__':
    print(get_helper_locations())
    print(get_predicted_price('1st block jayanagar',2,1000,2))
    print(get_predicted_price('1st block jayanagar',3,2000,3))
    print(get_predicted_price('1st block jayanagar',4,3000,4))
    print(get_predicted_price('devarachikkanahalli',2,1000,2))
