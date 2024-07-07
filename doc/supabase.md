User Management
Supabase makes it easy to manage your users.

Supabase assigns each user a unique ID. You can reference this ID anywhere in your database. For example, you might create a profiles table references the user using a user_id field.

Supabase already has built in the routes to sign up, login, and log out for managing users in your apps and websites.

Sign Up
Allow your users to sign up and create a new account.
After they have signed up, all interactions using the Supabase JS client will be performed as "that user".

USER SIGNUP
let { data, error } = await supabase.auth.signUp({
  email: 'someone@email.com',
  password: 'RpNRbvGDdxKhMgHibHbl'
})

Log In With Email/Password
If an account is created, users can login to your app.
After they have logged in, all interactions using the Supabase JS client will be performed as "that user".

USER LOGIN
let { data, error } = await supabase.auth.signInWithPassword({
  email: 'someone@email.com',
  password: 'RpNRbvGDdxKhMgHibHbl'
})

Log In With Magic Link Via Email
Send a user a passwordless link which they can use to redeem an access_token.
After they have clicked the link, all interactions using the Supabase JS client will be performed as "that user".

USER LOGIN
let { data, error } = await supabase.auth.signInWithOtp({
  email: 'someone@email.com'
})

Sign Up With Phone/Password
A phone number can be used instead of an email as a primary account confirmation mechanism.
The user will receive a mobile OTP via sms with which they can verify that they control the phone number.
You must enter your own twilio credentials on the auth settings page to enable sms confirmations.

PHONE SIGNUP
let { data, error } = await supabase.auth.signUp({
  phone: '+13334445555',
  password: 'some-password'
})

Login Via SMS OTP
SMS OTPs work like magic links, except you have to provide an interface for the user to verify the 6 digit number they receive.
You must enter your own twilio credentials on the auth settings page to enable SMS-based Logins.

PHONE LOGIN
let { data, error } = await supabase.auth.signInWithOtp({
  phone: '+13334445555'
})

Verify An SMS OTP
Once the user has received the OTP, have them enter it in a form and send it for verification
You must enter your own twilio credentials on the auth settings page to enable SMS-based OTP verification.

VERIFY PIN
let { data, error } = await supabase.auth.verifyOtp({
  phone: '+13334445555',
  token: '123456',
  type: 'sms'
})

Log In With Third Party OAuth
Users can log in with Third Party OAuth like Google, Facebook, GitHub, and more. You must first enable each of these in the Auth Providers settings here .
View all the available Third Party OAuth providers
After they have logged in, all interactions using the Supabase JS client will be performed as "that user".
Generate your Client ID and secret from: Google, GitHub, GitLab, Facebook, Bitbucket.

THIRD PARTY LOGIN
let { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github'
})

User
Get the JSON object for the logged in user.

GET USER
const { data: { user } } = await supabase.auth.getUser()
Forgotten Password Email
Sends the user a log in link via email. Once logged in you should direct the user to a new password form. And use "Update User" below to save the new password.

PASSWORD RECOVERY
let { data, error } = await supabase.auth.resetPasswordForEmail(email)
Update User
Update the user with a new email or password. Each key (email, password, and data) is optional

UPDATE USER
const { data, error } = await supabase.auth.updateUser({
  email: "new@email.com",
  password: "new-password",
  data: { hello: 'world' }
})

Log Out
After calling log out, all interactions using the Supabase JS client will be "anonymous".

USER LOGOUT
let { error } = await supabase.auth.signOut()
Send A User An Invite Over Email
Send a user a passwordless link which they can use to sign up and log in.

After they have clicked the link, all interactions using the Supabase JS client will be performed as "that user".

This endpoint requires you use the service_role_key when initializing the client, and should only be invoked from the server, never from the client.

INVITE USER
let { data, error } = await supabase.auth.admin.inviteUserByEmail('someone@email.com')