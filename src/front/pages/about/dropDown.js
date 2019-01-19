import React from "react";
import {ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import superagent from "superagent";

class BootstrapSelect extends React.Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.state = {
      actions: [],
      dropDownValue: 'Select action',
      dropdownOpen: false,
    };
  }

  toggle(event) {

    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  changeValue(e) {
    this.setState({dropDownValue: e.currentTarget.textContent});
    let id = e.currentTarget.getAttribute("id");
    console.log(id);
  }


  componentDidMount() {
    superagent
      .get('/getActions')
      .type('application/json; charset=utf-8')
      .end(function (err, res) {
        console.log(res.body);
        this.setState({actions: res.body});
      }.bind(this));

  }

  render() {
    return (
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          {this.state.dropDownValue}
        </DropdownToggle>
        <DropdownMenu>
          {this.state.actions.map(e => {
            return <DropdownItem id={e.id} key={e.id} onClick={this.changeValue}>{e.name}</DropdownItem>
          })}
        </DropdownMenu>

      </ButtonDropdown>
    );
  }

}

export default BootstrapSelect;
