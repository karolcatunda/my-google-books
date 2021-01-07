import React from 'react';
import { Box, Heading, Form, Button} from 'grommet';

const GOOGLE_API_REDIRECT_URI = 'https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/books&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=http://localhost:3000/home&client_id=855994734142-cdenn2tt65qi4qc6v6u5pih33dcn5ru2.apps.googleusercontent.com'

/**
 * Login renders the Google Sign In Authentication
 */
export default function Login() {
  function redirectToGoogleUserAuthentication() {
    window.location.href = GOOGLE_API_REDIRECT_URI
  };


  return (
    <Box
      align='center'
      pad='large'
      style={{ minHeight: '98vh' }}
      background={`url(${process.env.PUBLIC_URL}/my-books-background-1.jpg)`}
    >
      <Box
        className='box-login'
        pad='large'
        round='small'
        background='white'
        style={{ minHeight: '20%' }}
        width='30%' 
      >
        <Box direction='row'>
          <Box
            height='30px'
            width='30px'
            background={`url(${process.env.PUBLIC_URL}/book-icon.png)`}
            style={{ marginTop: '1.6rem', marginRight:'0.5rem' }}
          />
          <Heading level='3'>Logar no Meu Google Books</Heading>
        </Box>
        <Form onSubmit={redirectToGoogleUserAuthentication}>
          <Button color='white' type='submit'>
            <Box
              height='46px'
              width='191px'
              background={`url(${process.env.PUBLIC_URL}/btn_google_signin_light_normal_web.png)`}
            />
          </Button>
        </Form>
      </Box>
    </Box>
  );
}