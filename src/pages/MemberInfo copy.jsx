// ----- 巧琳 ----- //

import React from "react";
import $ from "jquery";
import MemberAdd from "../components/MemberAdd.jsx";

class MemberInfo extends React.Component {
  constructor(props) {
    super(props);
    // this.componentDidUpdate();
  }
  state = {
    data: [
      { id: 1, name: "edward" },
      { id: 2, name: "allen" },
      { id: 3, name: "emmy" },
    ],
  };

  // componentDidUpdate() {
  //     $.get('http://localhost:5000/member/list', e => {
  //         const newState = { ...this.state };
  //         newState.data = e;
  //         this.setState(newState);
  //     });
  // }

  // handleAddMember = e => {
  //     $.ajax({
  //         type: 'post',
  //         url: 'http://localhost:5000/member/add',
  //         data: { name: e }
  //     })
  //     this.setState({});
  // }

  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div>
            <h1>Member lists</h1>
            <table style={{ border: "1px solid black" }}>
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <MemberAdd onAddMember={this.handleAddMember} /> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MemberInfo;
