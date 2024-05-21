import { create } from 'zustand'

import {persist} from 'zustand/middleware'


export const userStore=create(
   persist((set)=>({
      
      user:{is_authenticated:false},
      updateUser: (newUser)=>set(state=>({
         user:{...state.user,...newUser,is_authenticated:true}
      })),
      removeUser: ()=>set({ user:{is_authenticated:false}}),
      
   }),
   {name:'user-storage'})
)

