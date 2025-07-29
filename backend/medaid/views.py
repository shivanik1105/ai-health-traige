from django.shortcuts import render
import os
import google.generativeai as genai
from dotenv import load_dotenv
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
# Get the API key from environment variables
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file.")

genai.configure(api_key=api_key)

# --- AI Model Configuration ---
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}

safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash",
    generation_config=generation_config,
    safety_settings=safety_settings,
)


# --- Django API View ---
class ChatView(APIView):
    """
    Handles the chat request from the React frontend.
    """
    def post(self, request, *args, **kwargs):
        try:
            user_input = request.data.get('question')
            age_group = request.data.get('age')

            if not user_input or not age_group:
                return Response(
                    {"error": "Missing 'question' or 'age' in request"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Construct the detailed prompt for the AI model
            prompt = f"""
                You are a helpful, empathetic, and knowledgeable health assistant.
                A user from the '{age_group}' age group has a question. 
                Your primary goal is to explain health-related concepts clearly and appropriately for their age.
                - For children (Under 13), use very simple language, analogies, and a friendly, encouraging tone.
                - For teenagers (13-18), use clear, straightforward language, be direct, and address concerns without being patronizing.
                - For young adults (19-24), you can be more detailed but still maintain a supportive tone.
                - For adults (25-40 and 41-60), provide comprehensive, well-structured information.
                - For seniors (61+), be clear, patient, and focus on practical advice.

                IMPORTANT: You are an AI assistant, not a doctor. Always include a disclaimer at the end of your response, such as: "Please remember, this information is for educational purposes and is not a substitute for professional medical advice. Always consult a healthcare provider for any health concerns."

                Here is the user's question: "{user_input}"
            """
            
            # Send the prompt to the Gemini model
            convo = model.start_chat(history=[])
            convo.send_message(prompt)
            
            # Return the model's response
            return Response({"response": convo.last.text}, status=status.HTTP_200_OK)

        except Exception as e:
            print(f"An error occurred: {e}")
            return Response(
                {"error": "An internal server error occurred."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
# Create your views here.
