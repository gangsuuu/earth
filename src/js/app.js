import MouseDraw from './MouseEvent.js'


export default function () {
  const lowText =document.querySelectorAll('.lowText')
  const upperText =document.querySelectorAll('.upperText')

  let uppertexts = []
  let lowtexts = []
  let x,y;
  let position = [-1, -.5, 0, .5, 1]
 /** mousePosition **/
  const mouseEvnet = new MouseDraw();
  mouseEvnet.draw();
  /** create */
  lowText.forEach((text)=>{
    lowtexts.push(text); 
  })
  upperText.forEach((text)=>{
    uppertexts.push(text); 
  })

  window.addEventListener('mousemove', (e) =>{
    let x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2) * (4/10)
    let y = ((e.clientY - window.innerHeight /2)*-1) / (window.innerHeight /2) * (4/10)
    upperText.forEach((text, index)=>{
      let sclaeY =  0.5 + y * position[index]
      text.style.transform = `scaleY(${sclaeY})`
    })
    lowtexts.forEach((text, index) =>{
      let sclaeY =  0.5 - y * position[index]
      text.style.transform = `scaleY(${sclaeY})`
    })
  })
}