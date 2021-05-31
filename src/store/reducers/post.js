import {LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../types";

const initialState = {
    allPosts: [],
    bookedPosts: [],
}


export const postReducer = (state = initialState, action) => {
    switch (action.type){

        // если это действие, тогда мы берем стейт, разворавичавем его при помощи оператора spread,
        // и заменяем в нем определенные поля
        case LOAD_POSTS: return {
            ...state,
            allPosts: action.payload,
            bookedPosts: action.payload.filter((post) => post.booked)
        }

        case TOGGLE_BOOKED:
            const allPosts = state.allPosts.map(post => {
                if(post.id === action.payload){
                    post.booked = !post.booked
                 }
                 return post
            })
            return {...state, allPosts, bookedPosts: allPosts.filter(post => post.booked)}
        case REMOVE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(p => p.id !== action.payload),
                bookedPosts: state.bookedPosts.filter(p => p.id !== action.payload)
            }
        default: return state
    }


    return state
}