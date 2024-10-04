import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { CBadge } from "@coreui/react";

export const AppSidebarNav = ({ items, invoice,userData }) => {
  AppSidebarNav.propTypes = {
    invoice: PropTypes.number,
    userData: PropTypes.object,
  };

  const location = useLocation();
  const navLink = (name, icon, badge) => {

    return (
      <>
        {icon && icon}
        {name && name}
        {name === "Invoice" && badge > 0 && (
          <CBadge color={'danger'} className="mx-2 ms-auto" style={{marginLeft:"15px"}}>
            {badge}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, invoice)}
        {/* <>
          {name === "Invoice" && invoice > 0 && (
            <Badge bg="danger">{invoice}</Badge>
          )}
        </> */}
      </Component>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item && (item.items ? navGroup(item, index, invoice) : navItem(item, index))
        )}
    </React.Fragment>
  );
  
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
