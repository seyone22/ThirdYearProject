# How to run

Run the API Server using the following commands.
First, activate the virtual environment using,
<br>
``.\venv\Scripts\activate``

Then, install necessary modules.
<br>
``pip install -r .\requirements.txt``

Then run the server using,
<br>
``flask run``


# What this server does

This server has one API route, ``/predict``. This route
is for getting recommendations based on the given book
title. The names must be from the dataset goodbooks-10k.

Working on extending it to a custom dataset, and running
a check to see if the name is within the database before
running the recommender.

# Dependencies

Please check ``requirements.txt`` for a full list of
dependencies. Of course, you need ``Python 3.11`` to run
the server. I tested on ``Python 3.11.8``

# Models

## Content Based Filtering Model

This model uses the goodbooks-10k dataset. It gives
recommendations using the cosine similarity measure
metric.

The parameters used in this model are
1. Genre
2. Title
3. Description

Feature extraction is done using multi label binarization
(for genre), and vectorization with a bag-of-words approach
(title and description)

# Next steps

- [x] Create Content-Based Filtering Model

- [ ] Create a Collaborative filtering model using data gathered
from the user data in the goodbooks-10k dataset, our own
generated data, and data from the Sri Lankan National Bibliography.

- [ ] Combine the Collaborative Filtering model and the Content-
Based filtering model, to create a hybrid recommendation
model.

- [ ] Improve the model using Matrix Factorization and Neural Net
techniques.