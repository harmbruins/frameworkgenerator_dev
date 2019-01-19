import React from 'react';
import {
  Alert,
  ButtonDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';

class React_TaskBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggledropdown = this.toggledropdown.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.select = this.select.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    this.state = {
      activeTab: '1',
      dropdownOpen: false,
      property: null,
      value: null,
      name: 'DataSet',
      visible: false,
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('changed' + event);
    this.setState({
      [name]: value,
    });
  }

  select(event) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      name: event.target.innerText,
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggledropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleSubmit(event) {
    this.setState({
      visible: false,
    });
    const vv = {
      'name': this.state.name,
      'property': this.state.property,
      'value': this.state.value,
      'page': 'Pagina',
      'dossiers': 'test',
    };
    console.log(vv);
    fetch('http://localhost:8096/scenario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*',
      },
      body: JSON.stringify(vv),
    })
      .then(
        // res => this.loadStudentsFromServer()
      )
      .catch(err => console.error(err));

    event.preventDefault();

    this.setState({
      visible: true,
    });
  }

  render() {
    return (
      <div>
        <Button className="float-right" color="success">Generate Framework</Button>
        <br/>
        <br/>
        <div>
          <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss} fade={true}>
            Well done! You added property {this.state.property} with value {this.state.value} to {this.state.name}
          </Alert>
        </div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => {
                this.toggle('1');
              }}
            >
              Config
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => {
                this.toggle('2');
              }}
            >
              Add content
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <br/>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Card body style={{ backgroundColor: '#f1f1f1' }}>
                  <CardTitle>Submit data </CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                <form onSubmit={this.handleSubmit}>
                  <InputGroup style={{ width: '40%', padding: '10px' }}>
                    <InputGroupAddon color="secondary" addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="property" name="property" type="input" value={this.state.property}
                           onChange={this.handleInputChange}/>
                  </InputGroup>
                  <br/>
                  <InputGroup style={{ width: '40%', padding: '10px' }}>
                    <InputGroupAddon color="secondary" addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="value" name="value" type="input" value={this.state.value}
                           onChange={this.handleInputChange}/>
                  </InputGroup>
                  <br/>
                  <Button outline color="danger" type="submit">Submit</Button>
                </form>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <br/>
          <TabPane tabId="1">
            <Row>
              <Col sm="6">
                <Card body style={{ backgroundColor: '#f1f1f1' }}>
                  <CardTitle>Create </CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="DataSetName"/>
                  </InputGroup>
                  <br/>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                    <Input placeholder="Subject or page name"/>
                  </InputGroup>
                  <br/>
                  <Button outline color="danger">Submit</Button>
                </Card>
              </Col>
              <Col sm="6">
                <Card body style={{ backgroundColor: '#f1f1f1' }}>
                  <CardTitle>Choose or copy an existing data set</CardTitle>
                  <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                  <ButtonDropdown style={{ width: '40%' }} direction="right" isOpen={this.state.btnDropright}
                                  toggle={() => {
                                    this.setState({ btnDropright: !this.state.btnDropright });
                                  }}>
                    <DropdownToggle caret color="danger">
                      {this.state.name}
                    </DropdownToggle>
                    <DropdownMenu id="lang" onChange={this.handleInputChange}>
                      <DropdownItem onClick={this.select}>DataSet 1</DropdownItem>
                      <DropdownItem onClick={this.select}>DataSet 2</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                  <br/>
                  <Button outline color="danger" style={{ width: '40%' }}>Copy</Button>{' '}<br/>
                  <Button outline color="danger" style={{ width: '40%' }}>Submit</Button>{' '}
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default React_TaskBar;
