import sqlite3
import pandas as pd
import numpy as np
import surprise
from collections import defaultdict
from data_processor import data_processor as dp
from surprise import KNNBasic

class RecommendModel:

    def __init__(self,user_data,user_id,DBpath,posWindow,boolLocate,topN):
    # input: user ID and DB path
        self.user_data = user_data
        self.user_id = user_id
        self.DBpath = DBpath
        self.posWindow = posWindow
        self.boolLocate = boolLocate
        self.topN = topN
    
    def prepare_Data(self):
        # prepare data for surpirse package use
        df,_,new_user = dp(self.user_id,self.DBpath,self.posWindow,self.boolLocate).make_df()
        if len(self.user_data) == 0:
            df_ready = df
        else:
            df_user = pd.DataFrame(list(zip(self.user_data['business_id'],[self.user_data['user_id']]*len(self.user_data['rating']),self.user_data['rating'])),columns =['itemID','userID', 'rating'])

            df_ready = pd.concat([df_user,df])
            try:
                sqliteConnection = sqlite3.connect(self.DBpath)
                cursor = sqliteConnection.cursor()
                for i in range(len(df_user)):
        
                    user = df_user.loc[i]["userID"]
                    item = df_user.loc[i]["itemID"]
                    rating = float(df_user.loc[i]["rating"])
        
                    sqlite_insert_with_param = """INSERT INTO REVIEW (user_id, business_id, stars) VALUES (?, ?, ?);"""

                    data_tuple = (user, item, rating)
                    cursor.execute(sqlite_insert_with_param, data_tuple)
                    sqliteConnection.commit()
                cursor.close()
            except sqlite3.Error as error:
                print("Failed to insert data into sqlite table", error)
            finally:
                if (sqliteConnection):
                    sqliteConnection.close()
        
        reader = surprise.Reader(rating_scale=(1,5))
        try:
            surprise_data = surprise.Dataset.load_from_df(df_ready[["userID","itemID","rating"]],reader)
        except:
            return []
        return(surprise_data)
    
    def content(self):
        # content based
        surprise_data = self.prepare_Data()
        if surprise_data == []:
            print("No data provided")
            return
            
        sim_options = {'name': 'cosine',
                       'user_based': False  # compute  similarities between items
                       }
        algo = KNNBasic(sim_options=sim_options)
        trainset = surprise_data.build_full_trainset()
        algo.fit(trainset)
        testset = trainset.build_testset()
        predictions = algo.test(testset)
        recommendation = self.get_top_n(predictions)    
        new_list = []
        k = 0
        for i,j in recommendation[self.user_id]:
            data_to_append = {}
            data_to_append.update({'id':k})
            data_to_append.update({'business id':i})
            new_list.append(data_to_append)
            k += 1
        recommend = {}
        recommend = {item['id']:item for item in new_list}
        return(recommend)
    
    def get_top_n(self, predictions):
        # get top N restaurant id and estimated rating n=self.topN
        n = self.topN
        top_n = defaultdict(list)
        for uid, iid, true_r, est, _ in predictions: 
            top_n[uid].append((iid, est))
                
        for uid, user_ratings in top_n.items(): 
            user_ratings.sort(key=lambda x: x[1], reverse=True) 
            top_n[uid] = user_ratings[:n]
            
        return top_n
