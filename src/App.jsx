import React from 'react';
 
class DataRow extends React.Component{
    constructor(props){
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
    }
  
    handleDelete(){
      this.props.deleteRow(this.props.dataString);
    }
  
    render(){
      const dataString = this.props.dataString;
      return(
        <div className='alert alert-primary'>
          {dataString}
          <button className='deleteBtn btn-close' onClick={this.handleDelete}></button>
        </div>
      );
    }
  }
  
  class OutputBox extends React.Component{
    constructor(props){
      super(props);
      this.handleDelete = this.handleDelete.bind(this);
    }
  
    handleDelete(deleteRow){
      this.props.deleteRow(deleteRow);
    }
  
    render(){
      let data = this.props.data;
      let dataRows = [];
      data.forEach(dataString => {
        dataRows.push(<DataRow dataString={dataString} key={dataString} deleteRow={this.handleDelete}/>);
      });
  
      return(
        <div className='outputBox'>
          {dataRows.length>0&&<h2>Your list:</h2>}
          <div>
            {dataRows}
          </div>
        </div>
      );
    }
  }
  
  class DataEntry extends React.Component{
    constructor(props){
      super(props);
      this.state = {input:''};
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event){
      this.setState({input:event.target.value});
    }
  
    handleSubmit(event){
      const input = this.state.input;
      if(input === '')
      {
        alert('your input cannot be null');
      }
      else
      {
        this.props.getInput(this.state.input);
        this.setState({input:''});
      }
      event.preventDefault();
    }
  
    render(){
      return(
        <div className='dataEntry'>
          <form onSubmit={this.handleSubmit}>
          <div className='dataDiv mb-3'>
            <label className="form-label">Add to ToDo list</label>
            <input type='text' placeholder='complete homework...' value={this.state.input} onChange={this.handleInputChange} className='form-control'/>
          </div>
          <input type='submit' value='Add' className='addButton btn btn-outline-primary'/>
          </form>
        </div>
      );
    }
  }
  
  
  export default class App extends React.Component{
    constructor(props){
      super(props);
      this.state={data:['Give input','click add','click delete']};
      this.appendData  = this.appendData.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
    }
  
    appendData(input){
      let data = this.state.data;
      if(data.indexOf(input)!==-1)
      {
        alert(input +' is already in your list');
      }
      else
      {
        data.push(input);
        this.setState({data:data});
      }
    }
  
    handleDelete(deleteRow){
      let data = this.state.data;
      const index = data.indexOf(deleteRow);
      data.splice(index,1);
      this.setState({data:data});
    }
  
    render(){
      return(
        <div className='app'>
          <DataEntry getInput={this.appendData}/>
          <OutputBox data={this.state.data} deleteRow={this.handleDelete}/>
        </div>
      );
    }
  }