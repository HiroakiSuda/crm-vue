from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Team
from .serializers import TeamSerializer

class TeamViewSet(viewsets.ModelViewSet):
  serializer_class = TeamSerializer
  queryset = Team.objects.all()
  
  def get_queryset(self):
    return self.queryset.filter(members__in=[self.request.user]).first()
  
  def perform_create(self, serializer):
    obj = serializer.save(created_by=self.request.user)
    obj.members.add(self.request.user)
    obj.save()
    

# @api_view(['GET'])
# def get_my_team(request):
#   team = Team.objects.filter(members__in=[request.user]).first()
#   serializer = TeamSerializer(team)
  
#   return Response(serializer.data)

# @api_view(['POST'])
# def add_member(request):
#   team = Team.objects.filter(members__in=[request.user]).first()
#   email = request.data['email']
  
#   print('Email', email)

#   user = User.objects.get(username=email)
  
#   team.members.add(user)
#   team.save()
  
#   return Response()


@api_view(['GET'])
def get_my_team(request):
    team = Team.objects.filter(members__in=[request.user]).first()

    if team is not None:
        serializer = TeamSerializer(team)
        return Response(serializer.data)
    else:
        return Response({'detail': 'Team not found for the user.'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_member(request):
    team = Team.objects.filter(members__in=[request.user]).first()
    email = request.data.get('email')

    if email:
        try:
            user = User.objects.get(username=email)
            team.members.add(user)
            team.save()
            return Response({'detail': 'Member added successfully.'})
        except User.DoesNotExist:
            return Response({'detail': 'User with the provided email not found.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)