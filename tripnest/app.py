from flask import Flask, request, jsonify
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from sklearn.neighbors import NearestNeighbors
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv('tripnova_destinations.csv')

# One-hot encode type and climate
df = pd.get_dummies(df, columns=['type', 'climate'])

# One-hot encode activities
all_activities = set()
for acts in df['activities'].dropna():
    for act in acts.split('|'):
        all_activities.add(act.strip().lower())
for act in all_activities:
    df['act_' + act] = df['activities'].apply(lambda x: int(act in x.lower().split('|')))

# Prepare features and scale
feature_cols = ['budget'] + \
               [col for col in df.columns if col.startswith('type_')] + \
               [col for col in df.columns if col.startswith('climate_')] + \
               [col for col in df.columns if col.startswith('act_')]

X = df[feature_cols]
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Train k-NN
knn = NearestNeighbors(n_neighbors=5, metric='euclidean')
knn.fit(X_scaled)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    user_type = data.get('type', '').capitalize()
    user_budget = data.get('budget', 0)
    user_activities = data.get('activities', [])
    user_climate = data.get('climate', '').lower()

    # Encode user input
    user_vec = [user_budget]

    # Type
    for col in df.columns:
        if col.startswith('type_'):
            user_vec.append(int(col == 'type_' + user_type.lower()))
    
    # Climate
    for col in df.columns:
        if col.startswith('climate_'):
            user_vec.append(int(col == 'climate_' + user_climate.lower()))
    
    # Activities
    for col in df.columns:
        if col.startswith('act_'):
            act_name = col.replace('act_', '')
            user_vec.append(int(act_name in user_activities))

    user_vec_scaled = scaler.transform([user_vec])

    distances, indices = knn.kneighbors(user_vec_scaled)
    recommended = df.iloc[indices[0]].sort_values(by='rating', ascending=False)

    # Return only necessary fields
    result = recommended[['name', 'country', 'budget', 'activities', 'rating']].to_dict(orient='records')
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
