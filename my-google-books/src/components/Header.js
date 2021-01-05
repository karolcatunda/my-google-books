import { Box, Button, Text, Grid } from 'grommet';
// import { CircleQuestion, Notification, User } from 'grommet-icons';
// import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { toggleAuthentication } from '../features/LoginSlice';
// import HpeLogo from './HpeLogo';
import React from 'react';

/**
 * Renders static header for all pages
 */
export default function Header() {
  
//   const dispatch = useDispatch();
//   const history = useHistory();

//   function logout(){    
//     history.push('/');
//     dispatch(toggleAuthentication);
//   }

  return (
    <Grid fill columns={['3/4', '1/4']} rows={['auto', 'auto']} areas={[['title', 'buttons']]}>
      <Box gridArea='title' align='center' direction='row'>
        {/* <HpeLogo /> */}
        <Text textAlign='start' weight='bold'>Seja bem vindo(a) ao My Google Books, sua biblioteca virtual!</Text>
      </Box>
      {/* <Box gridArea='buttons' align='center' justify='end' direction='row'>
        <Button icon={<CircleQuestion />} hoverIndicator />
        <Button icon={<Notification />} align='end' hoverIndicator />
        <DropButton
          icon={<User />}
          dropAlign={{ top: 'bottom', right: 'right' }}
          dropContent={
            <Box pad='xsmall'> 
              <Button plain style={{padding:'4px 10px'}} label='Logout' hoverIndicator onClick={() => logout() } />
            </Box>
          }
        />
      </Box> */}
    </Grid>
  );
}