import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import TokenService from '../services/token.service';

export const ProtectedRoute = ({ component: Component, ...rest}) => {
  


  return (

     <Route
     {...rest}
     render={
       props => {
        if(TokenService.getCurrentUserRole() !== 'admin' && TokenService.getUser()){
          return <Component {...props} />
        }
        else {
          return <Redirect to={{
            pathname: "/",
            state: {
              from: props.location
            }
          }}
          />
        }
       }
     }
    />
     
  
  );
}

export default ProtectedRoute;