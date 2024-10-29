# Python Cheat Sheet for Training an AI Model

This cheat sheet covers key Python concepts and code snippets needed to efficiently train AI models, including data processing, model building, and evaluation. 
## 1. Setting Up the Environment

- **Install Required Libraries**: Use `pip` to install essential libraries.
  
  ```sh
  pip install numpy pandas matplotlib tensorflow torch scikit-learn
  ```

- **Importing Libraries**:
  
  ```python
  import numpy as np
  import pandas as pd
  import matplotlib.pyplot as plt
  import tensorflow as tf
  import torch
  import torch.nn as nn
  import torch.optim as optim
  from sklearn.model_selection import train_test_split
  from sklearn.preprocessing import StandardScaler
  ```

## 2. Data Preparation

- **Load Dataset**:
  
  ```python
  data = pd.read_csv('dataset.csv')
  print(data.head())
  ```

- **Split Data into Features and Labels**:
  
  ```python
  X = data.drop(columns=['label'])
  y = data['label']
  ```

- **Train-Test Split**:
  
  ```python
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
  ```

- **Normalization** (using `StandardScaler` from scikit-learn):
  
  ```python
  scaler = StandardScaler()
  X_train = scaler.fit_transform(X_train)
  X_test = scaler.transform(X_test)
  ```

## 3. Building an AI Model

### Using TensorFlow

- **Define a Sequential Model**:
  
  ```python
  model = tf.keras.Sequential([
      tf.keras.layers.InputLayer(input_shape=(X_train.shape[1],)),
      tf.keras.layers.Dense(64, activation='relu'),
      tf.keras.layers.Dense(1, activation='sigmoid')
  ])
  ```

- **Compile the Model**:
  
  ```python
  model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
  ```

- **Train the Model**:
  
  ```python
  model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2)
  ```

### Using PyTorch

- **Define a Custom Neural Network**:
  
  ```python
  class NeuralNet(nn.Module):
      def __init__(self, input_size):
          super(NeuralNet, self).__init__()
          self.fc1 = nn.Linear(input_size, 64)
          self.relu = nn.ReLU()
          self.fc2 = nn.Linear(64, 1)
          self.sigmoid = nn.Sigmoid()

      def forward(self, x):
          x = self.fc1(x)
          x = self.relu(x)
          x = self.fc2(x)
          x = self.sigmoid(x)
          return x
  
  input_size = X_train.shape[1]
  model = NeuralNet(input_size)
  ```

- **Define Loss and Optimizer**:
  
  ```python
  criterion = nn.BCELoss()
  optimizer = optim.Adam(model.parameters(), lr=0.001)
  ```

- **Train the Model**:
  
  ```python
  for epoch in range(10):
      model.train()
      inputs = torch.tensor(X_train, dtype=torch.float32)
      labels = torch.tensor(y_train.values, dtype=torch.float32).view(-1, 1)
      
      # Forward pass
      outputs = model(inputs)
      loss = criterion(outputs, labels)
      
      # Backward pass
      optimizer.zero_grad()
      loss.backward()
      optimizer.step()
      
      print(f'Epoch [{epoch+1}/10], Loss: {loss.item():.4f}')
  ```

## 4. Evaluating the Model

- **Evaluate TensorFlow Model**:
  
  ```python
  loss, accuracy = model.evaluate(X_test, y_test)
  print(f'Test Accuracy: {accuracy:.2f}')
  ```

- **Evaluate PyTorch Model**:
  
  ```python
  model.eval()
  with torch.no_grad():
      inputs = torch.tensor(X_test, dtype=torch.float32)
      labels = torch.tensor(y_test.values, dtype=torch.float32).view(-1, 1)
      outputs = model(inputs)
      predictions = (outputs > 0.5).float()
      accuracy = (predictions.eq(labels).sum() / labels.shape[0]).item()
      print(f'Test Accuracy: {accuracy:.2f}')
  ```

## 5. AI Training

### Data Handling

- **Shuffling and Batching**:
  
  ```python
  from torch.utils.data import DataLoader, TensorDataset

  dataset = TensorDataset(torch.tensor(X_train, dtype=torch.float32), torch.tensor(y_train.values, dtype=torch.float32))
  train_loader = DataLoader(dataset, batch_size=32, shuffle=True)
  
  for batch in train_loader:
      inputs, labels = batch
      # Train on each batch
  ```

### Custom Metrics in TensorFlow

- **Creating Custom Metrics**:
  
  ```python
  def recall_m(y_true, y_pred):
      true_positives = tf.reduce_sum(tf.round(tf.clip_by_value(y_true * y_pred, 0, 1)))
      possible_positives = tf.reduce_sum(tf.round(tf.clip_by_value(y_true, 0, 1)))
      recall = true_positives / (possible_positives + tf.keras.backend.epsilon())
      return recall

  model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy', recall_m])
  ```

### Early Stopping in TensorFlow

- **Add Early Stopping to Training**:
  
  ```python
  early_stopping = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3)
  model.fit(X_train, y_train, epochs=50, validation_split=0.2, callbacks=[early_stopping])
  ```

### Saving Model Checkpoints

- **TensorFlow Model Checkpoints**:
  
  ```python
  checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(filepath='model_checkpoint.h5', save_best_only=True, monitor='val_loss')
  model.fit(X_train, y_train, epochs=50, validation_split=0.2, callbacks=[checkpoint_callback])
  ```

### Learning Rate Scheduler

- **TensorFlow Learning Rate Scheduler**:
  
  ```python
  lr_scheduler = tf.keras.callbacks.LearningRateScheduler(lambda epoch: 1e-3 * 10**(-epoch / 20))
  model.fit(X_train, y_train, epochs=10, callbacks=[lr_scheduler])
  ```

### Gradient Clipping in PyTorch

- **Clip Gradients During Training**:
  
  ```python
  for epoch in range(10):
      model.train()
      inputs = torch.tensor(X_train, dtype=torch.float32)
      labels = torch.tensor(y_train.values, dtype=torch.float32).view(-1, 1)
      
      # Forward pass
      outputs = model(inputs)
      loss = criterion(outputs, labels)
      
      # Backward pass
      optimizer.zero_grad()
      loss.backward()
      torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
      optimizer.step()
  ```

## 6. Plotting Training Curves

- **Plot Loss and Accuracy**:
  
  ```python
  history = model.fit(X_train, y_train, epochs=10, validation_split=0.2)
  plt.plot(history.history['loss'], label='train_loss')
  plt.plot(history.history['val_loss'], label='val_loss')
  plt.legend()
  plt.xlabel('Epochs')
  plt.ylabel('Loss')
  plt.title('Training and Validation Loss')
  plt.show()
  ```

## 7. Hyperparameter Tuning

- **Grid Search with `GridSearchCV`**:
  
  ```python
  from sklearn.model_selection import GridSearchCV
  from sklearn.ensemble import RandomForestClassifier

  param_grid = {
      'n_estimators': [100, 200],
      'max_depth': [10, 20, None]
  }

  rf = RandomForestClassifier()
  grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=3, n_jobs=-1, verbose=2)
  grid_search.fit(X_train, y_train)
  print(f'Best parameters: {grid_search.best_params_}')
  ```