import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import classes from "./Group.module.css";
import DeletePopup from "../DeletePop/DeletePopup";
import EditPopup from "../EditPop/EditPopGroup";
//Import action files
import { getgroups } from "../../Actions/Getgroups";
import Spinner from "../Spinner/Spinner";
//util to create new field
import creategroup from "../../Utils/CreateGroup";
import deletegroup from "../../Utils/DeleteGroup";
import editgroup from "../../Utils/EditGroup";
const Group = (props) => {
  const history = useHistory();

  const [gname, setgname] = useState("");
  const [message, setmessage] = useState("");
  const [toggler, settoggler] = useState(false);
  const [toggler2, settoggler2] = useState(false);
  const [id, setid] = useState();
  const [name2, setnametoedit] = useState();
  const onchange = (e) => {
    setgname(e.target.value);
  };
  /*------------------------Toggler 1--------------------- */
  const toggle = () => {
    if (toggler == false) {
      settoggler(true);
    } else {
      settoggler(false);
    }
  };
  const close = () => {
    settoggler(false);
  };
  const setidtodelete = (e, id) => {
    setid(id);
    toggle();
  };
  /*------------------------Toggler 2--------------------- */
  const toggle2 = () => {
    if (toggler2 == false) {
      settoggler2(true);
    } else {
      settoggler2(false);
    }
  };
  const close2 = () => {
    settoggler2(false);
  };
  const setnametoedit2 = (e, oldname, id) => {
    setnametoedit(oldname);
    setid(id);
    toggle2();
  };
  /* ------------------------------------------------------*/
  const groupname = gname;

  //Function to create field
  const create_group = async (e) => {
    e.preventDefault();
    const ans = await creategroup(gname);
    if (ans) {
      setmessage(
        <p style={{ color: "green" }}>Group registered successfully</p>
      );
      setgname("");
      async function fetchgroups() {
        await props.getgroups();
      }
      fetchgroups();
      setTimeout(() => {
        setmessage("");
      }, 2000);
    } else {
      setmessage(
        <p style={{ color: "red" }}>Oops! Group cannot be registered</p>
      );
      setTimeout(() => {
        setmessage("");
      }, 2000);
    }
  };
  const authemail = localStorage.getItem("email");
  const authpass = localStorage.getItem("password");
  if (authemail === null || authpass === null) {
    history.push("/");
  }
  useEffect(() => {
    async function fetchgroups() {
      await props.getgroups();
    }
    fetchgroups();
  }, [toggler, toggler2]);

  if (props.groups.isfetched === false) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        {toggler == true ? (
          <DeletePopup p_value={id} toggler={close} mainfunc={deletegroup} />
        ) : (
          <Fragment></Fragment>
        )}
        {toggler2 == true ? (
          <EditPopup
            toggler={close2}
            oldname={name2}
            id={id}
            mainfunc={editgroup}
          />
        ) : (
          <Fragment></Fragment>
        )}

        <div className={classes["body"]}>
          <div className={classes["head"]}>
            <h1 className={classes["h1"]}>User Defined Groups</h1>
          </div>
          <hr />
          <br />

          <div className={classes["form"]}>
            <input
              name="name"
              value={groupname}
              onChange={(e) => onchange(e)}
              className={classes["name"]}
              type="text"
              placeholder="Enter new group name"
            />
            <button
              onClick={(e) => create_group(e)}
              className={classes["btn-1"]}
            >
              <i class="fas fa-plus-square"></i> Create
            </button>
            <div>{message}</div>
          </div>

          <br />
          <table className={classes["table"]}>
            <tr>
              <th className={classes["th"]}>ID</th>
              <th className={classes["th"]}>
                <b>NAME</b>
              </th>
              <th className={classes["th"]}> </th>
              <th className={classes["th"]}> </th>
            </tr>
            {props.groups.c_groups.map((i) => {
              return (
                <tr>
                  <td className={classes["td"]}>{i.G_ID}</td>
                  <td className={classes["td"]}>{i.G_NAME}</td>
                  <td className={classes["td"]}>
                    <i
                      onClick={(e) => setidtodelete(e, i.G_ID)}
                      style={{ color: "red" }}
                      class="fas fa-trash-alt"
                    ></i>
                  </td>
                  <td style={{ color: "darkgreen" }} className={classes["td"]}>
                    <i
                      class="far fa-edit"
                      onClick={(e) => setnametoedit2(e, i.G_NAME, i.G_ID)}
                    ></i>
                  </td>
                </tr>
              );
            })}
          </table>
          <hr />
        </div>
      </Fragment>
    );
  }
};

Group.propType = {
  getgroups: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  groups: state.Group,
});
export default connect(mapStateToProps, { getgroups })(Group);
