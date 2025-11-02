

export const sleep = (t)=>{
    return new Promise<void>((res)=>{
      setTimeout(()=>{
        res();
      },t)
    })
  }