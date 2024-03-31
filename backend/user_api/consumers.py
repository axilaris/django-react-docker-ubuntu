from channels.generic.websocket import AsyncWebsocketConsumer
import json

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("XXX connect")
        await self.channel_layer.group_add("notifications", self.channel_name)
        await self.accept()        


    async def disconnect(self, close_code):
        print("XXX disconnect")
        pass

    async def receive(self, text_data):
        print("XXX receive")
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

    async def notification_message(self, event):
        print("XXX notification_message")
        await self.send(text_data=json.dumps(event["text"]))        
