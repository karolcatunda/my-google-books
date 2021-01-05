import React from 'react';
import { Box, Heading, Form, Button} from 'grommet';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login'
import Home from './Home';

const clientID = '855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com'


const GOOGLE_API_REDIRECT_URI = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/books&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/home&client_id=855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com'

export default function Login() {

  // const history = useHistory()

  // const onSuccess = (res) => {
  //   history.push('/home')
  // }

  // const onFailure = (res) => {
  //   console.log('resp error: ', res)
  // }

  // const history = useHistory();

  function redirectToGoogleUserAuthentication() {
    window.location.href = GOOGLE_API_REDIRECT_URI
  }


  return (
    <Box align='center' pad='large' style={{ minHeight: '98vh' }} background={`url(${process.env.PUBLIC_URL}/my-books-background-1.jpg)`}>
      <Box pad='large' round='small' background='white' style={{ minHeight: '200px' }} width='450px' >
        {/* <GoogleLogin
          clientId={clientID}
          buttonText='Sign in com a Conta Google'
          onSuccess={onSuccess}
          // onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        /> */}
        <Heading level='3'>Sign in to My Google Books</Heading>
        <Form onSubmit={redirectToGoogleUserAuthentication}>
          <Button primary type='submit'>
            <Box height='46px' width='191px' background={`url(${process.env.PUBLIC_URL}/btn_google_signin_light_normal_web.png)`} />
          </Button>
        </Form>
      </Box>
    </Box>
  );
}