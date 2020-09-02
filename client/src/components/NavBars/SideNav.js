import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
} from "react-pro-sidebar";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ProSidebar>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem>
              <a href="/">Home</a>
              {/* <Link to="/">Home</Link> */}
            </MenuItem>
            <MenuItem>
              <a href="/subscriptions">Subscriptions </a>
            </MenuItem>

            {this.props.isAuthenticated ? (
              <>
                <MenuItem> Liked Videos </MenuItem>

                {/* Todos */}
                {/* <MenuItem>
                  <Link to="/library">Library </Link>
                </MenuItem>
                <MenuItem> History </MenuItem>
                <MenuItem> Your Videos </MenuItem>

                <SubMenu title="Show More">
                  <MenuItem> Component 1 </MenuItem>
                  <MenuItem> Component 2 </MenuItem>
                </SubMenu> */}
              </>
            ) : (
              <></>
            )}
          </Menu>
        </SidebarContent>
      </ProSidebar>
    );
  }
}

export default SideNav;
