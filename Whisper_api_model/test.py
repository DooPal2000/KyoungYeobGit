import openai
import os 

# audio_file_path = "./test.mp3"

# if os.path.exists(audio_file_path):
#     print(f"'{audio_file_path}' 파일이 존재합니다.")
# else:
#     print(f"'{audio_file_path}' 파일이 존재하지 않습니다.")

client = openai.OpenAI(
    api_key = "sk---aU"
)
# api_key 별도보관입니다. google keep


audio_file_path = './test.mp3'
audio_file = open(audio_file_path, "rb")

transcript = client.audio.transcriptions.create(
    file= audio_file,
    model="whisper-1",
    language="ko",
    response_format="text",
    temperature=0.0,
)


print(transcript)
