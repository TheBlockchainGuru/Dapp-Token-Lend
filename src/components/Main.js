import React, {Component} from 'react';
import { Container, Col } from 'react-bootstrap';
import {
    Switch,
    Route,
} from "react-router-dom";
import EtherToERC20 from './EtherToERC20.js';
import Help         from './Help.js'


class Main extends Component {
    render() {
        return (
            <Container>
                <Col lg="12" >
                    <Switch>
                        <Route path="/ethertoerc20">
                            <EtherToERC20 />
                        </Route>
                        <Route path="/Help">
                            <Help/>
                        </Route>
                    </Switch>
                </Col>
            </Container>
        );
    }
}

export default Main;