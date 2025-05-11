# DEV Tinder APIs

### AuthRouter
-POST / signup
-post / login
-post / logout

### ProfileRouter
-get / profile-view
-patch / profile - update
-patch/profile-password

### ConnectionRequestRouter
-Post /request/send/interested/:userId
-Post / request/send/ignored/:userId
-post / request/review/accepted/:userId
-Post / reqeust/review/rejeced/:userId

### UserRouter
-Get / connections
-Get / request/received

Status: Interested, ignored, accepted, rejected