import sqlite3
import pandas as pd
import numpy as np
import surprise
from collections import defaultdict

class data_processor:

    def __init__(self,user_id,dbPath,posWindow,boolLocate):
    # input: user ID and DB path
        self.user_id = user_id
        self.dbPath = dbPath
        self.posWindow = posWindow
        self.boolLocate = boolLocate

    def open_connect(self):
        # build connection
        self.conn = sqlite3.connect(self.dbPath)

    def close_connect(self):
        # close connection
        self.conn.close()

    def locate_restrict(self):
        # restrict to current location window
        return(self.posWindow)
    
    def read_business(self):
        # get restaurant data from dataset
        pos = self.locate_restrict() if self.boolLocate else [-90,90,-180,180]
        cursor = None
        try:
            cursor = self.conn.execute("SELECT * FROM BUSINESS WHERE (latitude BETWEEN ? AND ?)" "AND (longitude BETWEEN ? AND ?)",(tuple(pos)))
        finally:
            if cursor is None:
                print("No store in the region")
                return None
                
            if cursor is not None:
                descript = [x[0] for x in cursor.description] 
                row = cursor.fetchall()
                df = pd.DataFrame(row, columns=descript)
                return df
    
    def read_review(self,business_id): 
        # get review data from dataset cursor = None
        cursor = None
        try:
            cursor = self.conn.execute("SELECT * FROM REVIEW WHERE business_id IN {} ".format(tuple( business_id)))
        finally:
            if cursor is None:
                print("No store in the region")
                return None
            if cursor is not None:
                descript = [x[0] for x in cursor.description] 
                row = cursor.fetchall()
                df = pd.DataFrame(row, columns=descript) 
                self.close_connect()
                return df
                
    def make_df(self):
        # get the required data and change it to dataframe 
        self.open_connect()
        df_business = self.read_business()
        df_review = self.read_review(df_business["business_id"])
        if df_review is None:
            print("No such store")
            return [],[],[]
        tmp_data = {"itemID":df_review["business_id"],"userID":df_review["user_id"],"rating":df_review["stars"]}
        df_ready = pd.DataFrame(tmp_data)
        if self.user_id not in df_ready["userID"].tolist():
            df_out = df_ready.sample(n = len(df_ready)) 
            num_of_unique_store = len(df_out['itemID'].unique())
            if num_of_unique_store > 10:
                data_to_user = df_out['itemID'].unique()[0:10]
            else:
                data_to_user = df_out['itemID'].unique()[:]
            data_to_user = dict(zip(list(range(0,len(data_to_user))), data_to_user.tolist()))
            new_user = 1
            return df_ready,data_to_user,new_user
        else:
            data_to_user = []
            new_user = 0
            return df_ready,data_to_user,new_user
