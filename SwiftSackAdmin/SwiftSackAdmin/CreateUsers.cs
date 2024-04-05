using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace SwiftSackAdmin
{
    public partial class CreateUsers : Form
    {
        private int userEmail;

        public CreateUsers(int roleId)
        {
            InitializeComponent();
            userEmail = roleId;
            // Puedes usar userEmail para personalizar la interfaz de usuario, cargar datos del usuario, etc.
        }
    }
}
