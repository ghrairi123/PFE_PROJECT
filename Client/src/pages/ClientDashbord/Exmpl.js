import React , { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchCategory,Show_Events_Category } from '../../redux/actions/CategoryActions';

class Welcome extends React.Component {
  
  Show_Events_Category(item){
    return `${item.Something} ${item.SomethingElse}`
  }
 
   
    DummyView = () => {
      const  categories  = useSelector(state=> state.category.categories.categories);
      console.log(categories)
      useEffect(() => {
        fetchCategory()
          this.setState({
              reduxState : categories
          })
      }, [])
      return null
  }
    render() {
      return   (   
        this.DummyView.categories  && this.DummyView.categories.length > 0 ? 
        this.DummyView.categories.map((cate)=>{
          return(
        <h1>{cate.name}</h1>)
      }
      ):null)
    }
  }


  export default Welcome 
