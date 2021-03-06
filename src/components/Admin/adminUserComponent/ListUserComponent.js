import React, { Component } from 'react';
import UserService from '../../../services/AdminUserService';
//import Header from '../../Header';


class ListUserComponent extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            users: []
        }
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.viewUser = this.viewUser.bind(this);
       // this.backBtn=this.backBtn.bind(this);
    }

    componentDidMount(){
        UserService.getUsers()
        .then((res) => {
            this.setState({users: res.data});
        });
    }

    addUser(){
        this.props.history.push('/add-user');
    }

    // backBtn(){
    //     this.props.history.push('/users');
    // }

    editUser(id){
        this.props.history.push(`/update-user/${id}`)
    }

    deleteUser(id){
        UserService.deleteUser(id).then((res) => {
            this.setState({users: this.state.users.filter( user => user.id !== id)});
        });
    }

    viewUser(id){
        
        this.props.history.push(`/view-user/${id}`);
    }

    render() {
        return (
            <div>
                {/* <Header/> */}
                <div className="container">
                    <h2 className="text-center mt-4">Users List</h2>
                    <div className="form-group"> 
                        <button className="btn btn-success btn-lg float-right btn-spacing" onClick={this.addUser}>Add User</button>
                        {/* <button className="btn btn-success btn-lg float-right" onClick={this.backBtn}>Back</button> */}

                    </div>
                    <div className="row">
                        <table className="table table-striped table-bordered table-color">
                            <thead>
                                <tr>                                
                                    <th>User Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email Id</th>
                                    <th>Password</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    
                                    this.state.users.map(
                                        user => 
                                        <tr key= {user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.emailId}</td>
                                            <td>{user.password}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <button onClick = {()=>this.editUser(user.id)} className = "btn btn-info">Edit</button>
                                            </td>
                                            <td>
                                                <button  style = {{marginLeft: "10px"}} onClick = {()=>this.deleteUser(user.id)} className = "btn btn-danger">Delete</button>
                                            </td>

                                            <td>
                                                <button  style = {{marginLeft: "10px"}} onClick = {()=>this.viewUser(user.id)} className = "btn btn-info">View</button>
                                            </td>
                                        </tr>  
                                    )
                                }


                            </tbody>

                        </table>

                    </div>
                </div>
            </div>
        );
    }
}

export default ListUserComponent;