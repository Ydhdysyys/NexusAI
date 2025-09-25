import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

interface Education {
  id: string;
  institution: string;
  course: string;
  period: string;
}

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    summary: ''
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      period: '',
      description: ''
    };
    setExperiences([...experiences, newExp]);
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: '',
      course: '',
      period: ''
    };
    setEducation([...education, newEdu]);
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const generateResume = () => {
    toast({
      title: "Currículo gerado!",
      description: "Seu currículo foi otimizado com IA e está pronto para download."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Construtor de Currículo Inteligente
          </h2>
          <p className="text-muted-foreground">
            Crie um currículo otimizado com inteligência artificial
          </p>
        </div>
        <Button onClick={generateResume} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Gerar PDF</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Informações Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-primary" />
              <span>Informações Pessoais</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input
                  id="fullName"
                  value={personalInfo.fullName}
                  onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={personalInfo.linkedin}
                  onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Resumo Profissional</Label>
              <Textarea
                id="summary"
                value={personalInfo.summary}
                onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                placeholder="Descreva brevemente seu perfil profissional..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Habilidades */}
        <Card>
          <CardHeader>
            <CardTitle>Habilidades</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Digite uma habilidade..."
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center space-x-1">
                  <span>{skill}</span>
                  <button onClick={() => removeSkill(skill)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experiência */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Experiência Profissional</CardTitle>
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Experiência {index + 1}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeExperience(exp.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Empresa</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Cargo</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Período</Label>
                    <Input
                      value={exp.period}
                      onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                      placeholder="Ex: Jan 2020 - Dez 2022"
                    />
                  </div>
                </div>
                <div>
                  <Label>Descrição</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                    placeholder="Descreva suas responsabilidades e conquistas..."
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Educação */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Educação</CardTitle>
              <Button onClick={addEducation} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Formação {index + 1}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeEducation(edu.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Instituição</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Curso</Label>
                    <Input
                      value={edu.course}
                      onChange={(e) => updateEducation(edu.id, 'course', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Período</Label>
                    <Input
                      value={edu.period}
                      onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                      placeholder="Ex: 2018 - 2022"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeBuilder;