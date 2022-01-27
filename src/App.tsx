import './App.css';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generatePath, Link as RouterLink, Route, Switch } from 'react-router-dom';

import {
    AppBar, Box, Container, List, ListItem, ListItemText, ListSubheader, Toolbar, Typography
} from '@mui/material';

import { fetchDeviceEvents, fetchFields, getAllDeviceEvents } from './reducers';

const EVENT_PAGE_PATH = "/event-:id";

function Page404(): JSX.Element {
  return (
    <Box flex={1} display="flex" justifyContent="center" alignItems="center">
      <Typography flex={1}>404</Typography>
    </Box>
  );
}

function EventsList(): JSX.Element {
  // TODO: Improve this view
  const events = useSelector(getAllDeviceEvents);
  return (
    <div id="events-list">
      <List subheader={<ListSubheader>Your Device Activity</ListSubheader>}>
        {events.map((event) => (
          <ListItem id={`event-list-item-${event.id}`} key={event.id}>
            <ListItemText
              primary={event.id}
              secondary={
                <Typography
                  component={RouterLink}
                  to={generatePath(EVENT_PAGE_PATH, { id: event.id })}
                >
                  Details
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

function EventDetailsPage({ eventId }: { eventId: string }): JSX.Element {
  // TODO: Improve this view
  return <div id="event-page">{eventId}</div>;
}

export default function App(): JSX.Element {
  const dispatch = useDispatch();
  React.useEffect(
    /**
     * Mock api call to get device events
     */
    () => {
      dispatch(fetchDeviceEvents());
    },
    [dispatch]
  );
  React.useEffect(
    /**
     * Mock API call to get field data
     */
    (): void => {
      dispatch(fetchFields());
    },
    [dispatch]
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="stretch"
    >
      <AppBar elevation={1} color="inherit" position="sticky">
        <Toolbar>
          <Typography
            fontWeight={"bold"}
            to="/"
            component={RouterLink}
            variant="h5"
          >
            Farm HQ
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Switch>
          <Route
            render={({ match }): JSX.Element => {
              const eventId = match.params.id;
              return <EventDetailsPage eventId={eventId} key={eventId} />;
            }}
            exact
            path={EVENT_PAGE_PATH}
          />
          <Route exact path="/" component={EventsList}></Route>
          <Route component={Page404} />
        </Switch>
      </Container>
    </Box>
  );
}
