export type UserRole = 'ADMIN' | 'PROFESSOR' | 'STUDENT_CLINIC' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  registration: string;
  password?: string;
  passwordChanged?: boolean;
  role: UserRole;
  blocked?: boolean;
}

export type PatientStatus = 'TRIAGEM' | 'AGUARDANDO_CONSULTA' | 'PACIENTE_ATIVO' | 'FALTA' | 'ALTA' | 'DESISTENCIA';

export interface Patient {
  id: string;
  name: string;
  medical_record_number: string;
  birth_date: string;
  phone: string;
  email: string;
  cpf: string;
  address: string;
  status: PatientStatus;
  age?: number;
}

export type EvolutionStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Evolution {
  id: string;
  appointment_id: string;
  patient_id: string;
  patient_name: string;
  medical_record_number: string;
  student_id: string;
  student_name: string;
  supervisor_id: string;
  supervisor_name: string;
  date: string;
  synthesis: string;
  conduct: string;
  observations: string;
  status: EvolutionStatus;
  feedback?: string;
}

export interface Appointment {
  id: string;
  patient_id: string;
  student_id: string;
  supervisor_id: string;
  date: string;
  time: string;
  status: 'SCHEDULED' | 'ATTENDED' | 'MISSED' | 'CANCELLED' | 'ALTA' | 'DESISTENCIA';
  patient_name?: string;
  student_name?: string;
  supervisor_name?: string;
  notes?: string;
}

export interface ClinicSettings {
  workDays: number[]; // 0-6
  startTime: string;
  endTime: string;
  interval: number; // minutes
  whatsappMessageTemplate?: string;
  logoUrl?: string;
  heroImageUrl?: string;
  projectDescription?: string;
  carouselImages?: string[];
}
