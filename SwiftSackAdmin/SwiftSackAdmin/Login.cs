using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Configuration;
using System.Data.SqlClient;

namespace SwiftSackAdmin
{
    public partial class Login : Form
    {
        public Login()
        {
            InitializeComponent();
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            logins();
        }

        public void logins()
        {
            try
            {
                string cnn = ConfigurationManager.ConnectionStrings["cnn"].ConnectionString;
                using (SqlConnection conexion = new SqlConnection(cnn))
                {
                    conexion.Open();
                    string query = "SELECT email, password, roleId FROM users WHERE email=@Email AND password=@Password";
                    using (SqlCommand cmd = new SqlCommand(query, conexion))
                    {
                        cmd.Parameters.AddWithValue("@Email", txtUser.Text);
                        cmd.Parameters.AddWithValue("@Password", txtPassword.Text);
                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.Read())
                        {
                            MessageBox.Show("Login exitoso");

                            string emailUsuario = dr["roleId"].ToString();

                            int userRol = int.Parse(emailUsuario);

                            if (userRol == 1) 
                            {
                                this.Hide();

                                CreateUsers dashboardForm = new CreateUsers(userRol);
                                dashboardForm.ShowDialog();
                                MessageBox.Show("Cerrando sesión...");

                                Application.Exit();
                            }
                        }
                        else
                        {
                            MessageBox.Show("Datos Incorrectos");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }
        }

    }
}
