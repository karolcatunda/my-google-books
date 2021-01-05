import { Box, Button, Sidebar as SB, Nav, Text } from 'grommet';
import { Book } from 'grommet-icons';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import React from 'react';
import styled from 'styled-components';

/**
 * Renders static sidebar for all pages
 * TODO: sidebar blinks sometimes when its expanding or collapsing, it shouldn't happen
 */
export default function Sidebar() {

//   const dispatch = useDispatch();

  return (
    <Box >
      <SB round='small' >
        <Nav gap='small'>
          {/* <SidebarButton icon={<Menu />} label='Menu' onClick={() => dispatch(toggleSidebar)} /> */}
          <Text style={{ marginBottom: '20px' }}>Olá, Ana Karoline</Text>
          <SidebarButton icon={<Book />} label='Meus Livros Favoritos' route='/favorites' />
          {/* <SidebarButton icon={<Servers />} label='Servers' route={ROUTES.SERVERS} />
          <SidebarButton icon={<ServerCluster />} label='Clusters CP' route={ROUTES.CLUSTERS_PANEL + '?type=' + HPE_CP} />
          <SidebarButton icon={<Device />} label='Appliances' route={ROUTES.APPLIANCES} />
          <SidebarButton icon={<VirtualMachine />} label='Virtual Machines' route={ROUTES.VMS} />
          <SidebarButton icon={<Network />} label='Switches' route={ROUTES.SWITCHES} />
          <SidebarButton icon={<Domain />} label='IAPs' route={ROUTES.IAPS} />
          <SidebarButton icon={<UserSettings />} label='Profiles' route={ROUTES.PROFILES} />
          <SidebarButton icon={<Group />} label='OS RMs Profiles' /> */}
        </Nav>
      </SB>
    </Box>
  );
}


/**
 * Renders a sidebar button
 *
 * @param {string} route where the user will be redirected onClick
 * @param {string} label to be displayed beside the icon
 * @param {string} rest any props inside it will be spread on StyledButton
 */
function SidebarButton({ route = '#', label, ...rest }) {

//   const isSidebarExpanded = useSelector(state => state.isSidebarExpanded);

  return (
    <Link to={route}>
      <StyledButton
        {...rest}
        fill
        style={{ padding: '14px' }}
        gap='none'
        hoverIndicator
        label={
            <Text
              size={'large'}
              style={{ whiteSpace: 'nowrap' }}
              margin={{ left: 'medium', right: 'small' }}
              weight={'normal'}>
              {label}
            </Text>
        }
      />
    </Link>
  );
}

const StyledButton = styled(Button)`
  div{
    justify-content: left;
  };
`;


