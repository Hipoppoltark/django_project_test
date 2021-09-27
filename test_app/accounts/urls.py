from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from .api import RegisterAPI, LoginAPI, UserAPI, LogoutView


urlpatterns = [
  path('api/auth/register/', RegisterAPI.as_view()),
  path('api/auth/login/', LoginAPI.as_view()),
  path('api/auth/user/', UserAPI.as_view()),
  path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
  path('api/auth/logout/', LogoutView.as_view(), name='auth_logout'),
]