from model import RecommendModel as rm
from data_processor import data_processor as dp
import pandas as pd
from collections import defaultdict
import sqlite3
import surprise
import random

DBpath='yelp.db'
### the range in which we will recommend the stores
### i,j are coordinate parameters from user
i = 40
j = -77
latitude = i
longtitude = j
posWindow=[latitude-0.5,latitude+0.5,longtitude-3,longtitude+3]
boolLocate = True
topN=10

### user_id is from user
user_id = 'yuanyuanyuan'
data = dp(user_id,DBpath,posWindow,boolLocate)

### If data_to_user is not empty, send data_to_user and new_user to user.
### If data_to_user is  empty, send new_user to user. (具体细节问毅哥)

### data_to_user is an array of 10 or less random stores
### new_user justifies whether the user is new or not. 0 is not new, and 1 is new
d,data_to_user,new_user = data.make_df()

user_data = []
model = rm(user_data,user_id,DBpath,posWindow,boolLocate,10)

model.content()
