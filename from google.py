from google.oauth2 import service_account
from googleapiclient.discovery import build

# Path to the downloaded JSON file with your credentials
json_file = "C:\\Users\\atifh\\OneDrive\\Desktop\\client_secret_590506154392-cnsie6gu1uqjs5b3lp8cqe37h3a1fter.apps.googleusercontent.com.json"

# Load the credentials from the JSON file
credentials = service_account.Credentials.from_service_account_file(json_file)

# Specify the scope for accessing the Content AI
scoped_credentials = credentials.with_scopes(['https://www.googleapis.com/auth/content'])

# Initialize the content API client
service = build('content', 'v2.1', credentials=scoped_credentials)

# test authentication by listing your products
merchant_id = '5445669637'  # Replace with your Merchant Center ID
request = service.products().list(merchantId=merchant_id)
response = request.execute()

# Print the response to verify it's working
print(response)