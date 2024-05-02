const firebaseConfig = {
    apiKey: "AIzaSyDZ7w9WFpy_WrgjFxaTJMuH9dSlhTmCgJM",
    authDomain: "vhillmx.firebaseapp.com",
    databaseURL: "https://vhillmx-default-rtdb.firebaseio.com",
    projectId: "vhillmx",
    storageBucket: "vhillmx.appspot.com",
    messagingSenderId: "727155769393",
    appId: "1:727155769393:web:ab2a3e6e53305008a0d510",
    measurementId: "G-MFTKDG48MS"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const form = document.getElementById('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = form.elements['name'].value;
    const job = form.elements['job'].value;
    const files = form.elements['files'].files;
  
    const storageRef = firebase.storage().ref(`files/${Date.now()}`);
   
    const fileUrls = []; // Aquí almacenaremos las URLs de los archivos
  
    for (let i = 0; i < files.length; i++) {
      const fileRef = storageRef.child(files[i].name);
      await fileRef.put(files[i]);
      const downloadUrl = await fileRef.getDownloadURL();
      fileUrls.push(downloadUrl); // Almacenar la URL en el array
    }
  
    // Guardar los datos en Firestore junto con las URLs de los archivos
    await db.collection('productos').add({
      name,
      job,
    
      fileUrls, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("Datos y archivos guardados en Firestore y Firebase Storage.");
   form.reset();
  });

  const dataList = document.getElementById('dataList');
  // Obtener y mostrar los datos de Firestore
  db.collection('productos').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement('div');
      listItem.classList.add('CardAgenteList');
      listItem.innerHTML = `

      <div class="NombreAgentes">
        <p>${data.name} </p> 
        <p>${data.job} </p> 
    </div>


      <div class="InfoAgentes">
      <p>${data.name} </p> 
      <p>${data.job} </p> 
      <p>${data.email}</p> 
      <a href="${data.company}">
      <i class='bx bxl-linkedin-square IconoRedesA'></i>
      </a>
      <br>
      <br>
      

      <a class="BtnAgente" href="
      https://api.whatsapp.com/send/?phone=52${data.phone}" target="_blank">

      CONTACT AGENT NOW 
      </a>
    
      </div>

      
   
      ${data.fileUrls ? data.fileUrls.map((url) => `
        <img src="${url}" target="_blank"></img>
      `).join('') : '<p>No hay archivos adjuntos </p> <br> '}
   
      <div class="FondoAgente">
      </div>

        `;
      dataList.appendChild(listItem);
    });
  });