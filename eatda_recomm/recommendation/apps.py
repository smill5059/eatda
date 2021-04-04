from django.apps import AppConfig
from recommendation.views import Similarity

class RecommendationConfig(AppConfig):
    name = 'recommendation'

class MySchedule(AppConfig):
    name = 'recommendation'
    
    def ready(self):
        # Similarity()
        return print("앱 시작시 실행 됩니다!")