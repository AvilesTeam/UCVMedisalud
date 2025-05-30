import { Component, OnInit, inject } from '@angular/core';
import { getFirestore, query, onSnapshot,
   collection, where, doc, getDoc, updateDoc } from 'firebase/firestore'; 
import { user_Estructura } from 'src/app/models/user_Estructura.model';
import { FirebaseService_Datos } from 'src/app/services/firebase_Datos.service';
import { UtilsService_Image } from 'src/app/services/utils_Image.service';

@Component({
  selector: 'app-UserDoctor',
  templateUrl: './UserDoctorPrivado_IS.page.html',
  styleUrls: ['./UserDoctorPrivado_IS.page.scss'],
})
export class UserDoctorPrivado_ISPage implements OnInit {
  firebaseSvc = inject(FirebaseService_Datos);
  utilsSvc = inject(UtilsService_Image);
  users: user_Estructura[] = [];
  loading: boolean = false;

  ngOnInit() {}

  user(): user_Estructura {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getUsers();
  }

  
  doRefresh(event) {
    setTimeout(() => {
      this.getUsers();
      event.target.complete();
    }, 1000);
  }

  async getUsers() {
    this.loading = true;

    // Utilizamos una consulta para obtener solo los usuarios con el rol de administrador
    let usersQuery = query(collection(getFirestore(), 'user'), where('role', '==', 'admin'));

    let sub = onSnapshot(usersQuery, async (querySnapshot) => {
      let user = [];
      querySnapshot.forEach(async (doc) => {
        user.push(doc.data());
      });
      console.log(user);
      this.users = user;
      this.loading = false;
      // No es necesario desuscribirse de onSnapshot
    }, (error) => {
      console.error('Error al obtener los usuarios:', error);
    });
  }

  async updateUserAccountStatus(userId: string, newStatus: string) {
    const userRef = doc(collection(getFirestore(), 'user'), userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      userData['estadocuenta'] = newStatus; // Cambia 'active' al estado deseado

      // Actualiza los datos del usuario en Firestore
      await updateDoc(userRef, userData);
    } else {
      console.error('El usuario no existe');
    }
  }
}
