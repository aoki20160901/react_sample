import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, isAllowed, redirect, ...rest }) => {
  return (
    <Route
      {...rest}
      render={
        (props) => {
          redirect = typeof redirect === 'function' ? redirect(props.location) : redirect;
          return isAllowed
        ? <Component {...props} />
        : <Redirect to={{ pathname: redirect, state: { from: props.location } }} />
      }}
    />
  )
}

export default ProtectedRoute