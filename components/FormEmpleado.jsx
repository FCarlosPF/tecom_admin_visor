import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import Draggable from "react-draggable";
import { format } from "date-fns"; // Importamos el formato de fecha
import Image from "next/image";

const FormEmpleado = forwardRef(({ employee, tasks, onClose }, ref) => {
  const formRef = useRef(null);
  const [activeTab, setActiveTab] = useState("details");

  // Detectar clics fuera del formulario
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useImperativeHandle(ref, () => ({
    getNode: () => formRef.current,
  }));

  if (!employee) return null;

  return (
    <Draggable nodeRef={formRef} grid={[25, 25]} scale={1}>
      <div
        ref={formRef}
        className="fixed top-0 right-0 bg-white text-gray-800 p-6 rounded-lg shadow-xl w-96 m-4 z-50 transition-transform transform duration-300 ease-in-out"
        style={{ transform: "translateY(50%)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 focus:outline-none text-2xl"
        >
          &times;
        </button>
        <div className="flex justify-between mb-6 border-b pb-4">
          <button
            onClick={() => setActiveTab("details")}
            className={`px-4 py-2 font-semibold text-lg ${
              activeTab === "details"
                ? "border-b-4 border-blue-500"
                : "text-gray-500"
            } transition-colors hover:text-blue-500`}
          >
            Detalles del empleado
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`px-4 py-2 font-semibold text-lg ${
              activeTab === "tasks"
                ? "border-b-4 border-blue-500"
                : "text-gray-500"
            } transition-colors hover:text-blue-500`}
          >
            Tareas
          </button>
        </div>
        {activeTab === "details" && (
          <div className="space-y-4">
            <div>
              <label className="font-semibold text-sm text-gray-700">
                Nombre:
              </label>
              <span className="block text-gray-800">{employee.nombre}</span>
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-700">
                Apellidos:
              </label>
              <span className="block text-gray-800">{employee.apellidos}</span>
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-700">
                Correo:
              </label>
              <span className="block text-gray-800">{employee.correo}</span>
            </div>
            <div>
              <label className="font-semibold text-sm text-gray-700">
                Especialidad:
              </label>
              <span className="block text-gray-800">
                {employee.especialidad}
              </span>
            </div>
{/*             <div>
              <label className="font-semibold text-sm text-gray-700">
                Fecha de Contratación:
              </label>
              <span className="block text-gray-800">
                {employee.fecha_contratacion}
              </span>
            </div> */}
            {employee.foto && (
              <div>
                <label className="font-semibold text-sm text-gray-700">
                  Foto:
                </label>
                <Image
                  src={employee.foto}
                  alt="Employee Photo"
                  width={200}
                  height={200}
                  className="w-full h-auto object-cover rounded-lg shadow-lg"
                />
              </div>
            )}
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto">
              {tasks
                .filter(
                  (task) =>
                    task.tarea.estado === "Pendiente" ||
                    task.tarea.estado === "En Progreso"
                )
                .map((task, index) => {
                  const formattedDate = format(
                    new Date(task.tarea.fecha_estimada_fin),
                    "dd/MM/yyyy"
                  ); // Formateamos la fecha
                  return (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="font-semibold text-lg text-gray-900">
                        {task.tarea.titulo}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <strong>Fecha estimada de finalización:</strong>{" "}
                        {formattedDate}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        <strong>Prioridad:</strong> {task.tarea.prioridad}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
});

FormEmpleado.displayName = "FormEmpleado";

export default FormEmpleado;
