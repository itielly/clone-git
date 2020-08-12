import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import App from './App'
import Home from './Home'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:repository?" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}